import { openDB } from 'idb';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

const DB_NAME = 'photo-booth-cache';
const STORE_NAME = 'photos';

export async function initLocalDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
    });
}

export async function savePhoto(dataUrl, templateId, filterSettings) {
    const user = auth.currentUser;
    if (!user) throw new Error("Auth required");

    // Photo Data is stored directly as a base64 string in Firestore.
    // Note: Firestore doc limit is 1MB. DataURL (base64) adds overhead.
    const photoDoc = {
        imageUrl: dataUrl,
        templateId,
        timestamp: serverTimestamp(),
        filterSettings,
        uid: user.uid
    };

    const docRef = await addDoc(collection(db, `users/${user.uid}/photos`), photoDoc);

    // Save locally
    const dbLocal = await initLocalDB();
    await dbLocal.put(STORE_NAME, {
        id: docRef.id,
        ...photoDoc,
        timestamp: new Date()
    });

    return docRef.id;
}

export async function getPhotos(onUpdate) {
    const user = auth.currentUser;
    if (!user) return [];

    // Try local first
    const dbLocal = await initLocalDB();
    const localPhotos = await dbLocal.getAll(STORE_NAME);
    onUpdate(localPhotos.sort((a, b) => b.timestamp - a.timestamp));

    // Sync with Firestore
    const q = query(
        collection(db, `users/${user.uid}/photos`),
        orderBy("timestamp", "desc")
    );

    return onSnapshot(q, async (snapshot) => {
        const photos = [];
        const tx = dbLocal.transaction(STORE_NAME, 'readwrite');
        for (const doc of snapshot.docs) {
            const data = { id: doc.id, ...doc.data() };
            if (data.timestamp?.toDate) {
                data.timestamp = data.timestamp.toDate();
            }
            photos.push(data);
            await tx.store.put(data);
        }
        await tx.done;
        onUpdate(photos);
    });
}

export async function deletePhoto(photoId) {
    const user = auth.currentUser;
    if (!user) return;

    // Delete from Firestore
    await deleteDoc(doc(db, `users/${user.uid}/photos`, photoId));

    // No Storage cleanup needed anymore as photos are in Firestore

    // Delete from local cache
    const dbLocal = await initLocalDB();
    await dbLocal.delete(STORE_NAME, photoId);
}
