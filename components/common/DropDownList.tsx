import { Button, Menu } from '@mantine/core';
import { v4 } from 'uuid';
import MyLink from './MyLink';
interface Props {
	target: string;
	label: string;
	classes?: string;
	links: [{ label: string; link: string }];
}
export default function DropDownList({ target, label, links, classes }: Props) {
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<Button>{target}</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>{label}</Menu.Label>
				<Menu.Divider />
				{links.map((x) => {
					return (
						<Menu.Item key={v4()}>
							<MyLink href={x.link} text={x.label} className={classes} />
						</Menu.Item>
					);
				})}
			</Menu.Dropdown>
		</Menu>
	);
}
