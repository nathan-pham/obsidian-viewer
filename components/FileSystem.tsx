import { Store } from "../hooks/useStore.d";
import Folder from "./Folder";
import File from "./File";

const FileSystem = (props: Store["fileSystem"]) => {
    return (
        <>
            {[...props.children]
                .sort((itemA, itemB) => {
                    if (itemA.name < itemB.name) {
                        return 1;
                    } else if (itemA.name > itemB.name) {
                        if ("children" in itemA) {
                            return 1;
                        }

                        return -1;
                    }

                    return 0;
                })
                .map((child) => {
                    if ("children" in child) {
                        return <Folder key={child.id} {...child} />;
                    }

                    return <File key={child.id} {...child} />;
                })}
        </>
    );
};

export default FileSystem;