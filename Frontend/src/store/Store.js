import { configureStore} from "@reduxjs/toolkit";
import jobReducer from "./Slices/JobSlice"
import UserReducer from "./Slices/UserSlice";
import applicationReducer from "./Slices/ApplicationSlice";
import updateProfileReducer from "./Slices/UpdateProfileSlice";

const store = configureStore({
    reducer: {
        // Define your reducers here
        user: UserReducer,
        jobs: jobReducer,
        applications: applicationReducer,
        updateProfile: updateProfileReducer,
    }
})

export default store;