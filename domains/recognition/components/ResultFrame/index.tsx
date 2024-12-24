"use client";
import { Button, Card, Divider, Flex, Text, Stack, Title } from "@mantine/core";
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
import { ResultType } from "../../types";

export default function ResultFrame({
    result,
    changeResultText,
}: {
    result: ResultType[];
    changeResultText: ({
        index,
        text,
    }: {
        index: number;
        text: string;
    }) => void;
}) {
    const [input, setInput] = useState(
        "безазорнъ҇хъ лиць кромѣ ходѧть · же-нѹ имать или рабъ҇-нѧ · безазорьноѥ се- бе ѡ семь хранѧ · аще ли престѹпаѥть кто нами повелѣ- наӻ да извержетьс̑ · се же и скопьци хранѧ- ть · непорочноѥ себе промъ҇шлѧюще · пре- стѹпающе же · аще причетничи сѹть  да извергѹтьсѧ · а- ще ли простьчи да ѿ-тъл̑·	лѹчатьсѧ  ~ Иже имѣти рабъ҇нѧ · или инъ҇ӻ женъ҇ · ѹ · себе в домѹ сщнъ҇мъ · рекше прозвѹтерѻ-"
    );
    const [opened, { toggle }] = useDisclosure(true);

    const handleButtonClick = (char: string) => {
        if (editorRef.current) {
            editorRef.current.insertTextAtCursor(char);
        }
    };
    const onChangeInput = (value: string) => {
        setInput(value);
    };

    const editorRef = useRef<any>(null);
    const downloadFile = async () => {
        const string = result.map((res) => res.resultText).join("<p/><p/>");
        const data = await HTMLtoDOCX(string);
        saveAs(data, "result.docx");
    };
    console.log(result);
    return (
        <Stack pb={370}>
            <Title order={3}>Результаты распознавания:</Title>
            <Card withBorder>
                <Stack>
                    <Title order={5}>Условные обозначения:</Title>
                    <Flex>
                        <span style={{ color: "#F03E3E" }}>asdasd</span>
                        <Text>
                            - текст, в котором высока вероятность ошибки
                        </Text>
                    </Flex>
                    <Flex>
                        <u>еевапвап</u>
                        <Text>- текст, который находится под "домиком"</Text>
                    </Flex>
                </Stack>
            </Card>
            {result &&
                Array.isArray(result) &&
                result.map((elem, index) => {
                    const matches = elem.image.match(/^data:(.+);base64,(.+)$/);
                    if (!matches) {
                        console.error(
                            `Invalid base64 string at index ${index}`
                        );
                        return;
                    }
                    const mimeType = matches[1];
                    const base64Content = matches[2];
                    const extension = mimeType.split("/")[1];

                    // Decode base64 content
                    const binaryContent = atob(base64Content);
                    const byteArray = new Uint8Array(binaryContent.length);
                    for (let i = 0; i < binaryContent.length; i++) {
                        byteArray[i] = binaryContent.charCodeAt(i);
                    }

                    // Create a Blob and trigger download
                    const blob = new Blob([byteArray], { type: mimeType });
                    return (
                        <Flex
                            align="start"
                            miw="100%"
                            ml={10}
                            gap={20}
                            key={elem.image}
                        >
                            <Image
                                src={URL.createObjectURL(blob)}
                                alt="image"
                                height={400}
                                width={150}
                                style={{ objectFit: "contain" }}
                            />
                            <Stack style={{ flexGrow: 1 }}>
                                <RichTextEditor
                                    value={elem.resultText}
                                    onChange={(text) =>
                                        changeResultText({ index, text })
                                    }
                                    ref={editorRef}
                                />
                            </Stack>
                        </Flex>
                    );
                })}
            <Divider orientation="horizontal" h={2} w="100%" />

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
    );
}
