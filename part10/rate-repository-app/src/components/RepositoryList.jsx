import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Menu, Button, Divider } from "react-native-paper";
import useRepositories from "../hooks/useRepositories";
import { RepositoryItemContainer } from "./RepositoryItem";
import SORT from "../utils/Sort";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortMenu = ({ menuIsVisible, openMenu, closeMenu, changeSort }) => {
	return (
		<Menu
			visible={menuIsVisible}
			onDismiss={closeMenu}
			anchor={<Button onPress={openMenu}>Select Sort</Button>}
		>
			<Menu.Item
				onPress={() => {
					closeMenu();
					changeSort(SORT.LATEST);
				}}
				title="Latest Repositories"
			/>
			<Divider />
			<Menu.Item
				onPress={() => {
					closeMenu();
					changeSort(SORT.HIGHEST_RATED);
				}}
				title="Highest Rated Repositories"
			/>
			<Divider />
			<Menu.Item
				onPress={() => {
					closeMenu();
					changeSort(SORT.LOWEST_RATED);
				}}
				title="Lowest Rated Repositories"
			/>
		</Menu>
	);
};
export const RepositoryListContainer = ({
	repositories,
	menuIsVisible,
	openMenu,
	closeMenu,
	changeSort,
}) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			// other props
			ListHeaderComponent={
				<SortMenu
					menuIsVisible={menuIsVisible}
					openMenu={openMenu}
					closeMenu={closeMenu}
					changeSort={changeSort}
				/>
			}
			renderItem={({ item }) => <RepositoryItemContainer item={item} />}
		/>
	);
};

const RepositoryList = () => {
	const [sort, setSort] = useState(SORT.LATEST);
	const { repositories } = useRepositories(sort);

	const [visible, setVisible] = useState(false);

	const openMenu = () => {
		setVisible(true);
	};

	const closeMenu = () => {
		setVisible(false);
	};

	const changeSort = (selectedSort) => {
		setSort(selectedSort);
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			menuIsVisible={visible}
			openMenu={openMenu}
			closeMenu={closeMenu}
			changeSort={changeSort}
		/>
	);
};

export default RepositoryList;
