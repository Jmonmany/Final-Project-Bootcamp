/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { ArtworkContext } from "../../context/artworks.context";
export function Uploader() {
    const { handleFile } = useContext(ArtworkContext);
    return (
        <>
            <form action="" onSubmit={handleFile}>
                <input type="file" name="file" id="getFile"/>
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

