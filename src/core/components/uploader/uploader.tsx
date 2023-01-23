/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "../../../config";
import { listAll, ref, uploadBytes } from "firebase/storage"
import { useEffect } from "react";
export function Uploader() {
    // const [imageList,  setImageList] = useState([])
    const handleFile = (ev: any) => {
        ev.preventDefault();
        const input: any = ev.target.getFiles.files[0];
        if (input === undefined) {
            alert('Any file selected')
            return;
        }
        const artworkRef = ref(storage, input.name)
        uploadBytes(artworkRef, input);
    }
    useEffect(()=> {
        const artworkListRef = ref(storage)
        listAll(artworkListRef).then((response) => {
            response.items.forEach((item) => {
                // console.log(getDownloadURL(item));
            });
        });
    }, []);
    return (
        <>
            <form action="" onSubmit={handleFile}>
                <input type="file" name="file" id="getFiles"/>
                {/* <input
                    type="text"
                    name="title"
                    placeholder="select your file"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="add description"
                /> */}
                <button type="submit">
                    Send
                </button>
            </form>
        </>
    );
} 

