import Link from "next/link";

async function getNotes() {
        const res = await fetch(' http://127.0.0.1:8090/api/collections/title/records?page=1&perPage=10');

        //await is used to wait for the fetch to complete

        const data = await res.json();  

        //we await again because we want to wait for the json to be parsed

        return data?.items as any[];
        //this will return an array of notes
        //? is used to check if data is not null

}

export default async function NotesPage() {
    //async because we might fetch data here

        const notes = await getNotes();
        //gives us access to the notes
        return (
            <div>
                <h1>Notes</h1>
                <div>
                    {notes?.map((note) => (
                        <Note key={note.id} note={note} />
                    ))}
                </div>
            </div>
        );
    }

    function Note({ note }: any) {
        const {id, title, content} = note || {};

        return (
            <Link href={`/notes/${id}`}>
                <div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
            </Link>
        );
    }
