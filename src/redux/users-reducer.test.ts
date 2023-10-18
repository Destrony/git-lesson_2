import UsersReducer, {
    actions,
    InitialStateType
} from "./users-reducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
    randomPlace: [
        "Австралия", "Австрия", "Азербайджан", "Албания", "Алжир",
        "Ангола", "Андорра", "Антигуа", "Барбуда", "Аргентина", "Армения",
        "Афганистан", "Багамские", "Острова", "Бангладеш", "Барбадос", " Бахрейн", " Белиз",
        " Белоруссия", " Бельгия", " Бенин", " Болгария", " Боливия", " Босния и Герцеговина",
        "Ботсвана"],

        users: [
        {id: 0, name: 'Arnold 0', followed: false, photos: {small: null, large: null},
            status: "status 1"},
        {id: 1, name: 'Arnold 1', followed: false, photos: {small: null, large: null},
            status: "status 2"},
        {id: 2, name: 'Arnold 2', followed: true, photos: {small: null, large: null},
            status: "status 3"},
        {id: 3, name: 'Arnold 3', followed: true, photos: {small: null, large: null},
            status: "status 4"}
    ],
        pageSize: 30,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
        }
})

test("follow success", () => {
    const newState = UsersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})
    test("unfollow success", () => {
    const newState = UsersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[1].followed).toBeFalsy();
})