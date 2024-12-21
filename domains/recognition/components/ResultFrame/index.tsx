"use client";
import { Button, Flex, SegmentedControl, Stack } from "@mantine/core";
import React, { useRef, useState } from "react";
import image from "@/assets/136.jpg";
import Image from "next/image";
import Keyboard from "react-simple-keyboard";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { ChevronDown, ChevronUp, DownloadIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import OrganizedButtonGrid from "./OrganizedButtonGrid";
//@ts-ignore
import HTMLtoDOCX from "html-to-docx";
import { saveAs } from "file-saver";

export default function ResultFrame() {
    const [input, setInput] = useState(
        "безазорнъ҇хъ лиць кромѣ ходѧть · же-нѹ имать или рабъ҇-нѧ · безазорьноѥ се- бе ѡ семь хранѧ · аще ли престѹпаѥть кто нами повелѣ- наӻ да извержетьс̑ · се же и скопьци хранѧ- ть · непорочноѥ себе промъ҇шлѧюще · пре- стѹпающе же · аще причетничи сѹть  да извергѹтьсѧ · а- ще ли простьчи да ѿ-тъл̑·	лѹчатьсѧ  ~ Иже имѣти рабъ҇нѧ · или инъ҇ӻ женъ҇ · ѹ · себе в домѹ сщнъ҇мъ · рекше прозвѹтерѻ-"
    );
    const [opened, { toggle }] = useDisclosure(true);

    const handleButtonClick = (char: string) => {
        if (editorRef.current) {
            editorRef.current.insertTextAtCursor(char); // Call method to insert text
        }
    };
    const onChangeInput = (value: string) => {
        setInput(value);
    };

    const editorRef = useRef<any>(null);
    const downloadFile = async () => {
        const data = await HTMLtoDOCX(input);
        saveAs(data, "hello.docx");
    };

    return (
        <Flex align="start" miw="100%" ml={10} gap={20} pb={300}>
            <Image src={image} alt="image" width={500} height={400} />
            <Stack style={{ flexGrow: 1 }}>
                <SegmentedControl
                    data={[
                        { label: "Страница 1", value: "1" },
                        { label: "Страница 2", value: "2" },
                    ]}
                />

                <RichTextEditor
                    value={input}
                    onChange={onChangeInput}
                    ref={editorRef}
                />
                <Button
                    rightSection={<DownloadIcon size={20} />}
                    onClick={downloadFile}
                >
                    Сохранить
                </Button>

                <Stack
                    style={{
                        position: "fixed",
                        left: 220,
                        bottom: 0,
                        zIndex: 100,
                    }}
                    miw="calc(100vw - 220px)"
                    gap={0}
                >
                    {opened && (
                        <OrganizedButtonGrid
                            handleButtonClick={(val) => handleButtonClick(val)}
                        />
                    )}
                    <Button variant="white" onClick={toggle}>
                        {opened ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
