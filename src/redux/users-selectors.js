import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
}
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users;
})
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}
export const getRandomPlace = (state) => {
    let coutries = [
        "Австралия", "Австрия", "Азербайджан", "Албания", "Алжир", "Ангола", "Андорра", "Антигуа",  "Барбуда", "Аргентина", "Армения", "Афганистан", "Багамские", "Острова", "Бангладеш", "Барбадос", " Бахрейн"," Белиз"," Белоруссия"," Бельгия"," Бенин"," Болгария"," Боливия"," Босния и Герцеговина", "Ботсвана"]
    let cities = [
        "Абаза", "Абакан", "Абдулино", "Абинск", "Агидель", "Агрыз", "Адыгейск", "Азнакаево", "Азов", "Ак"-"Довурак", "Аксай", "Алагир", "Алапаевск", "Алатырь", "Алдан", "Алейск", "Александров", "Александровск", "Александровск-Сахалинский", "Алексеевка", "Алексин", "Алзамай", "Алупка", "Алушта", "Альметьевск", "Амурск", "Анадырь", "Анапа", "Ангарск", "Андреаполь", "Анжеро-Судженск", "Анива", "Апатиты", "Апрелевка", "Апшеронск", "Арамиль", "Аргун", "Ардатов", "Ардон", "Арзамас", "Аркадак", "Армавир", "Армянск", "Арсеньев"]

    return state.usersPage.randomPlace = {
        country: coutries,
        city: cities
    }
}