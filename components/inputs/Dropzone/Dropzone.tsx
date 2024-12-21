import { useController, useFormContext } from "react-hook-form";

import { Input } from "@mantine/core";

import { Dropzone as CustomDropzone } from "@/components/Dropzone";

import { DropzoneProps } from "./types";

export const Dropzone = ({
    name,
    shouldUnregister = false,
    disabled,
    withAsterisk,
    ...props
}: DropzoneProps) => {
    const { control, formState } = useFormContext();

    const {
        field: { ref, onChange, ...fieldProps },
        fieldState: { error },
    } = useController({ name, control, shouldUnregister });

    return (
        <Input.Wrapper
            error={error?.message}
            label={props?.label}
            withAsterisk={withAsterisk}
        >
            <CustomDropzone
                disabled={formState.isSubmitting || disabled}
                onDrop={(files) => onChange(files)}
                {...fieldProps}
                {...props}
            />
        </Input.Wrapper>
    );
};
