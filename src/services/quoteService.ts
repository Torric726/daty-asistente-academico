
import { collection, getDocs, addDoc, query, where, Timestamp, DocumentData, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CurrencyCode } from "./currencyService";

export interface Quote {
  id?: string;
  timestamp: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  servicioNombre: string;
  dias: number;
  descripcion: string;
  precio: number;
  moneda: CurrencyCode;
  estado: string;
  userId?: string | null;
  photoURL?: string | null;
}

// Guardar cotización en Firestore
export const saveQuote = async (quote: Omit<Quote, 'id'>) => {
  try {
    // Guardar en Firebase si hay autenticación
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quote,
      timestamp: Timestamp.fromMillis(quote.timestamp),
    });
    
    // Guardar también en localStorage como respaldo
    const quoteWithId = { id: docRef.id, ...quote };
    saveQuoteToLocalStorage(quoteWithId);
    
    return quoteWithId;
  } catch (error) {
    console.error("Error al guardar la cotización en Firebase:", error);
    
    // Fallback: Si falla Firebase, guardar solo en localStorage
    const localQuoteId = `DATY-LOCAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const quoteWithId = { id: localQuoteId, ...quote };
    saveQuoteToLocalStorage(quoteWithId);
    
    return quoteWithId;
  }
};

// Función para guardar una cotización en localStorage
const saveQuoteToLocalStorage = (quote: Quote) => {
  try {
    const savedQuotes = getLocalQuotes();
    const existingQuoteIndex = savedQuotes.findIndex(q => q.id === quote.id);
    
    if (existingQuoteIndex !== -1) {
      savedQuotes[existingQuoteIndex] = quote;
    } else {
      savedQuotes.push(quote);
    }
    
    localStorage.setItem('datyQuotes', JSON.stringify(savedQuotes));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

// Obtener todas las cotizaciones (solo para admin)
export const getAllQuotes = async (): Promise<Quote[]> => {
  try {
    const quotesSnapshot = await getDocs(collection(db, 'quotes'));
    const firebaseQuotes = quotesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toMillis(),
      } as Quote;
    });
    
    // Combinar con cotizaciones locales para asegurar que todas estén disponibles
    const localQuotes = getLocalQuotes();
    
    // Filtrar para evitar duplicados (priorizar Firebase)
    const firebaseIds = firebaseQuotes.map(q => q.id);
    const uniqueLocalQuotes = localQuotes.filter(q => !firebaseIds.includes(q.id || ''));
    
    return [...firebaseQuotes, ...uniqueLocalQuotes].sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    // Fallback a localStorage si Firebase falla
    return getLocalQuotes();
  }
};

// Obtener cotizaciones de un usuario específico
export const getUserQuotes = async (userId: string): Promise<Quote[]> => {
  try {
    const q = query(collection(db, 'quotes'), where("userId", "==", userId));
    const quotesSnapshot = await getDocs(q);
    const userQuotes = quotesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toMillis(),
      } as Quote;
    });
    
    // Incluir también cotizaciones locales asociadas con este usuario
    const localQuotes = getLocalQuotes().filter(q => q.userId === userId);
    
    // Filtrar para evitar duplicados (priorizar Firebase)
    const firebaseIds = userQuotes.map(q => q.id);
    const uniqueLocalQuotes = localQuotes.filter(q => !firebaseIds.includes(q.id || ''));
    
    return [...userQuotes, ...uniqueLocalQuotes];
  } catch (error) {
    console.error("Error al obtener las cotizaciones del usuario:", error);
    // Fallback a localStorage si Firebase falla
    return getLocalQuotes().filter(q => q.userId === userId);
  }
};

// Actualizar el estado de una cotización
export const updateQuoteStatus = async (quoteId: string, newStatus: string): Promise<void> => {
  try {
    // Intentar actualizar en Firebase primero
    const quoteRef = doc(db, 'quotes', quoteId);
    await updateDoc(quoteRef, {
      estado: newStatus
    });
    
    // También actualizar en localStorage para mantener sincronización
    updateLocalQuoteStatus(quoteId, newStatus);
    
    return;
  } catch (error) {
    console.error("Error al actualizar el estado de la cotización:", error);
    
    // Si falla en Firebase, asegurarse de actualizar en localStorage
    const updated = updateLocalQuoteStatus(quoteId, newStatus);
    if (!updated) {
      throw error; // Si tampoco se puede actualizar localmente, propagar error
    }
  }
};

// Función para cotizaciones en localStorage
export const getLocalQuotes = (): Quote[] => {
  try {
    const savedQuotes = localStorage.getItem('datyQuotes');
    if (savedQuotes) {
      return JSON.parse(savedQuotes);
    }
  } catch (error) {
    console.error("Error al cargar cotizaciones del localStorage:", error);
  }
  return [];
};

// Actualizar el estado de una cotización local
export const updateLocalQuoteStatus = (quoteId: string, newStatus: string): boolean => {
  try {
    const savedQuotes = getLocalQuotes();
    const quoteIndex = savedQuotes.findIndex(q => q.id === quoteId);
    
    if (quoteIndex !== -1) {
      savedQuotes[quoteIndex].estado = newStatus;
      localStorage.setItem('datyQuotes', JSON.stringify(savedQuotes));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al actualizar el estado de la cotización local:", error);
    return false;
  }
};
