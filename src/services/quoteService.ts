
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
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quote,
      timestamp: Timestamp.fromMillis(quote.timestamp),
    });
    return { id: docRef.id, ...quote };
  } catch (error) {
    console.error("Error al guardar la cotización:", error);
    throw error;
  }
};

// Obtener todas las cotizaciones (solo para admin)
export const getAllQuotes = async (): Promise<Quote[]> => {
  try {
    const quotesSnapshot = await getDocs(collection(db, 'quotes'));
    return quotesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toMillis(),
      } as Quote;
    });
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    throw error;
  }
};

// Obtener cotizaciones de un usuario específico
export const getUserQuotes = async (userId: string): Promise<Quote[]> => {
  try {
    const q = query(collection(db, 'quotes'), where("userId", "==", userId));
    const quotesSnapshot = await getDocs(q);
    return quotesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toMillis(),
      } as Quote;
    });
  } catch (error) {
    console.error("Error al obtener las cotizaciones del usuario:", error);
    throw error;
  }
};

// Actualizar el estado de una cotización
export const updateQuoteStatus = async (quoteId: string, newStatus: string): Promise<void> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId);
    await updateDoc(quoteRef, {
      estado: newStatus
    });
    return;
  } catch (error) {
    console.error("Error al actualizar el estado de la cotización:", error);
    throw error;
  }
};

// Función para cotizaciones en localStorage (fallback y compatibilidad)
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
