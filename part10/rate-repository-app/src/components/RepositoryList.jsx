import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Menu, Button, Divider, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import useRepositories from "../hooks/useRepositories";
import { RepositoryItemContainer } from "./RepositoryItem";
import SORT from "../utils/Sort";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	headerContainer: {
		display: "flex",
		gap: 10,
		margin: 10,
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
	searchKeyword,
	updateSearchKeyword,
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
				<View style={styles.headerContainer}>
					<Searchbar
						placeholder="Search"
						onChangeText={updateSearchKeyword}
						value={searchKeyword}
					/>
					<SortMenu
						menuIsVisible={menuIsVisible}
						openMenu={openMenu}
						closeMenu={closeMenu}
						changeSort={changeSort}
					/>
				</View>
			}
			renderItem={({ item }) => <RepositoryItemContainer item={item} />}
		/>
	);
};

const RepositoryList = () => {
	const [sort, setSort] = useState(SORT.LATEST);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

	const { repositories } = useRepositories(sort, debouncedSearchKeyword);

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

	const updateSearchKeyword = (keyword) => {
		setSearchKeyword(keyword);
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			searchKeyword={searchKeyword}
			updateSearchKeyword={updateSearchKeyword}
			menuIsVisible={visible}
			openMenu={openMenu}
			closeMenu={closeMenu}
			changeSort={changeSort}
		/>
	);
};

export default RepositoryList;
