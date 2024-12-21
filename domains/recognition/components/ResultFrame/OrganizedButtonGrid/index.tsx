import { Stack } from "@mantine/core";
import CharacterButtonRow from "../CharacterButtonRow";

export default function OrganizedButtonGrid({
    handleButtonClick,
}: {
    handleButtonClick: (val: string) => void;
}) {
    return (
        <Stack
            miw="100%"
            p={10}
            bg="white"
            style={(theme) => ({
                borderTop: `1px solid ${theme.colors.gray[3]}`,
            })}
        >
            <CharacterButtonRow
                startCode="0430"
                rowCount={11}
                handleButtonClick={handleButtonClick}
            />
            <CharacterButtonRow
                startCode="0440"
                rowCount={11}
                handleButtonClick={handleButtonClick}
            />
            <CharacterButtonRow
                startCode="0450"
                rowCount={11}
                handleButtonClick={handleButtonClick}
            />
            <CharacterButtonRow
                startCode="0461"
                rowCount={11}
                coefficient={2}
                handleButtonClick={handleButtonClick}
            />
        </Stack>
    );
}
