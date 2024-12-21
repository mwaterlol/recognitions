"use client";
import Dropzone from "@/components/Dropzone";
import MainLayout from "@/components/layouts/MainLayout";
import ResultFrame from "@/domains/recognition/components/ResultFrame";
import { useRecognizeSingleImage } from "@/domains/recognition/hooks/useRecognizeSingleImage";
import {
    Button,
    Collapse,
    Flex,
    Loader,
    LoadingOverlay,
    Stack,
    Text,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";

export default function Generation() {
    const [frame, setFrame] = useState<"form" | "loading" | "result">("form");

    const recognizeSingleMutation = useRecognizeSingleImage();
    const onSubmit = async (file: FileWithPath) => {
        const data = await recognizeSingleMutation.mutateAsync(file);
        setFrame("result");
    };
    const frameComponent = {
        form: <Dropzone onSubmit={(file) => onSubmit(file)} />,
        loading: null,
        result: <ResultFrame />,
    }[frame];

    return (
        <MainLayout>
            {recognizeSingleMutation.isLoading ? (
                <LoadingOverlay
                    visible
                    ml={300}
                    mt={80}
                    loaderProps={{
                        children: (
                            <Stack align="center">
                                <Loader size="xl" />
                                <Text size="xl">Распознаем изображение...</Text>
                            </Stack>
                        ),
                    }}
                ></LoadingOverlay>
            ) : (
                <> {frameComponent}</>
            )}
        </MainLayout>
    );
}
