import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    // title: Yup.string().required("You must input a title"),
    // gramText: Yup.string().required("You must input a description"),
    file: Yup.mixed().test('required', 'Please select a file', value => {
        return value && value.length;
    }),
    //   "fileSize",
    //   "Your image is too big",
    //   value => value && value.size <= 500000
    // )
})

