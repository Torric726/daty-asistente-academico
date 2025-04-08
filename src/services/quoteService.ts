
import { collection, getDocs, addDoc, Timestamp, DocumentData } from "firebase/firestore";
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

// Guardar solicitud en Firestore y localStorage
export const saveQuote = async (quote: Omit<Quote, 'id'>) => {
  try {
    // Guardar en Firebase 
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quote,
      timestamp: Timestamp.fromMillis(quote.timestamp),
    });
    
    // Guardar también en localStorage como respaldo
    const quoteWithId = { id: docRef.id, ...quote };
    saveQuoteToLocalStorage(quoteWithId);
    
    return quoteWithId;
  } catch (error) {
    console.error("Error al guardar la solicitud en Firebase:", error);
    
    // Fallback: Si falla Firebase, guardar solo en localStorage
    const localQuoteId = `LOCAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const quoteWithId = { id: localQuoteId, ...quote };
    saveQuoteToLocalStorage(quoteWithId);
    
    return quoteWithId;
  }
};

// Función para guardar una solicitud en localStorage
const saveQuoteToLocalStorage = (quote: Quote) => {
  try {
    const savedQuotes = getLocalQuotes();
    const existingQuoteIndex = savedQuotes.findIndex(q => q.id === quote.id);
    
    if (existingQuoteIndex !== -1) {
      savedQuotes[existingQuoteIndex] = quote;
    } else {
      savedQuotes.push(quote);
    }
    
    localStorage.setItem('quotes', JSON.stringify(savedQuotes));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

// Obtener todas las solicitudes
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
    
    // Obtener también solicitudes locales para asegurar que todas estén disponibles
    const localQuotes = getLocalQuotes();
    
    // Filtrar para evitar duplicados (priorizar Firebase)
    const firebaseIds = firebaseQuotes.map(q => q.id);
    const uniqueLocalQuotes = localQuotes.filter(q => !firebaseIds.includes(q.id || ''));
    
    return [...firebaseQuotes, ...uniqueLocalQuotes].sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    // Fallback a localStorage si Firebase falla
    return getLocalQuotes();
  }
};

// Función para solicitudes en localStorage
export const getLocalQuotes = (): Quote[] => {
  try {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      return JSON.parse(savedQuotes);
    }
  } catch (error) {
    console.error("Error al cargar solicitudes del localStorage:", error);
  }
  return [];
};
