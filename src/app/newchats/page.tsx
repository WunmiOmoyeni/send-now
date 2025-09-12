"use client"

import { useEffect, useState } from "react";

interface SavedContact {
    id: string;
    contact_id: string;
    contact: {
        name: string;
        description?: string;
        profilePic?: string;
    };
}


interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results : SavedContact[];
}

export default function NewChats () {
    const [contacts, setContacts] = useState<SavedContact[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null> (null);
    const [count, setCount] = useState(0);

    const fetchContacts = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await fetch (``)
        } catch (error) {
            
        }
    }
}