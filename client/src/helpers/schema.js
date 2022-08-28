import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    gramText: Yup.string().required("You must input a description"),
    image: Yup.mixed().test('required', 'Please select a file', value => {
        return value && value.length;
    }),
    //   "fileSize",
    //   "Your image is too big",
    //   value => value && value.size <= 500000
    // )
})

export const registrationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(64).required("You must input a name"),
    firstName: Yup.string().min(3).max(64).required("You must input a first name"),
    lastName: Yup.string().min(3).max(64).required("You must input a last name"),
    email: Yup.string().min(3).max(64).required("You must input a email"),
    password: Yup.string().min(4).max(20).required(),
})

