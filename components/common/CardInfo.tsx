import { Card, Image, Text, Badge, Button, Group, Divider, Loader, Title, Tooltip } from "@mantine/core";
import { _ActivityInfo } from "../../types/types";
import { useRouter } from "next/router";
import { serverLink } from "../../shared/links";
import DeleteOrphanModal from "../orphans/modals/DeleteOrphanModal";
import DeleteModal from "./DeleteModal";
import EditModel from "./EditModel";
import { IconEdit } from "@tabler/icons-react";
interface Props {
    activityInfo: _ActivityInfo
}
export default function CardInfo({ activityInfo }: Props) {
    const router = useRouter();
    if (!activityInfo) return <Loader size={100} />
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
                <Title order={2} weight={500}>{activityInfo.title}</Title>
                <Title order={2} weight={500}>{activityInfo.type}</Title>
                <Title order={2} weight={500}>{activityInfo.date.toDateString()}</Title>
            </Group>
            {/* <Text size="xl" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes
                with tours and activities on and around the fjords of Norway
            </Text> */}
            <Divider mt="md" mb="md" />
            <Group position="apart" mt="md" mb="xs">
                <Text>Goals: {activityInfo.ActivityGoal.map(x => x.GoalInfo.title).join(', ')}</Text>
                <Text>Budget: {activityInfo.budget}</Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
                <Text>Target: {activityInfo.target}</Text>
                <Text>Quarter: {activityInfo.quarter}</Text>
            </Group>
            <Group position="right" mt="md">

                <DeleteModal id={activityInfo.id} title={'activity'} url={'api/activity/'} type="Delete" />

                <Tooltip label={'Edit'}>
                    <Button
                        onClick={() => {
                            router.push(serverLink + 'activities/' + activityInfo.id)
                        }}
                        color="yellow">
                        <IconEdit />

                    </Button>
                </Tooltip>

                <Button
                    onClick={() => {
                        router.push(serverLink + 'activity/' + activityInfo.id)
                    }}
                    color="blue">
                    Info
                </Button>
                <Button
                    onClick={() => {
                        router.push(serverLink + 'activity/' + activityInfo.id)
                    }}
                    color="green">
                    Execute
                </Button>
            </Group>
        </Card>
    );
}