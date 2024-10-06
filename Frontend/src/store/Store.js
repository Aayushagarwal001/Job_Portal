import { configureStore} from "@reduxjs/toolkit";
import jobReducer from "./Slices/JobSlice"
import UserReducer from "./Slices/UserSlice";
import ApplicationReducer from "./Slices/ApplicationSlice";

const store = configureStore({
    reducer: {
        // Define your reducers here
        user: UserReducer,
        jobs: jobReducer,
        applications: ApplicationReducer,
    }
})

export default store;