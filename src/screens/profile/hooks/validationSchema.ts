import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  bio: Yup.string()
    .min(10, "Bio must be at least 10 characters")
    .max(200, "Bio must be less than 200 characters")
    .required("Bio is required"),
});

export default validationSchema;
