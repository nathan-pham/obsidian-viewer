import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoAnalytics, IoApps, IoHelp, IoPerson } from "react-icons/io5";

import AppIcon from "./AppIcon";
import AppAdmin from "./apps/AppAdmin";
import AppGraph from "./apps/AppGraph";
import AppHelp from "./apps/AppHelp";
import Modal from "./Modal";

const variantApps = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
};

const Apps = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="fixed right-4 bottom-4 flex flex-col gap-2">
            <motion.div
                className="flex flex-col gap-2"
                variants={variantApps}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
            >
                <AppIcon modalTitle="Help" modalChildren={<AppHelp />}>
                    <IoHelp />
                </AppIcon>
                <AppIcon modalTitle="Settings" modalChildren={<AppAdmin />}>
                    <IoPerson />
                </AppIcon>
                <AppIcon modalTitle="Graph View" modalChildren={<AppGraph />}>
                    <IoAnalytics />
                </AppIcon>
            </motion.div>

            <AppIcon onClick={() => setShow(!show)}>
                <IoApps />
            </AppIcon>
        </div>
    );
};

export default Apps;
