"use client";
import React from "react";
import * as Yup from "yup";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import {
  AppForm,
  AppFormField,
  AppSubmitButton,
  Header,
  Pargraph,
  Progress,
} from "@/components";
import { OfficeData } from "@/constants/homepage";
import { LogoContainer } from "..";
import { motion } from "framer-motion";
import { textContainer } from "@/utils/motion";
import { FormikValues } from "formik";
import { useAPI } from "@/hooks";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});
const initialValues: FormikValues = { email: "" };

const { Data, backGroundImage } = OfficeData;

export default function ContactUs() {
  const URL = process.env.NEXT_PUBLIC_NEWSLETTER_REGISTER_URL as string;

  const { submitForm, submit, progress, setSubmit, message, error } = useAPI();
  return (
    <LogoContainer
      backGroundImage={backGroundImage}
      className=" h-[70vh] px-10 lg:w-[85%] mx-auto justify-center flex flex-col"
    >
      <motion.div
        variants={textContainer}
        initial="hidden"
        whileInView="show"
        className=" flex flex-col md:flex-row gap-20"
      >
        <div className=" flex flex-col gap-5 md:w-[60%]">
          {submit ? (
            <Progress process={progress} error={error} message={message} />
          ) : (
            <>
              <Header
                lable="Sign up for our newsletter"
                className=" text-BlueDark"
              />
              <Pargraph lable="Subscribe to get the latest expo news, articles, and resources." />
              <AppForm
                initialValues={initialValues}
                onSubmit={(values: FormikValues) => submitForm(values, URL)}
                validationSchema={validationSchema}
              >
                <div className=" flex gap-2 items-center align-middle">
                  <AppFormField
                    required
                    name="email"
                    className=" mb-2 flex-1 lg:min-w-[400px]"
                    label="Email"
                  />
                  <AppSubmitButton
                    title={"Submit"}
                    iconOnly={true}
                    Icon={<BsFillArrowRightCircleFill />}
                    setProcess={setSubmit}
                    setError={() => {}}
                  />
                </div>
              </AppForm>
            </>
          )}
        </div>
        <div className="md:w-[50%] leading-6">
          <Header lable="Our Offices" className=" text-BlueDark" />
          <div className="flex flex-col md:flex-row gap-5 md:gap-20 mt-5">
            {Data.map((office, index) => (
              <div key={index}>
                <h4 className="text-2xl font-semibold">Office {index + 1}</h4>
                <p className="text-base font-thin flex gap-2 text-BlueLight">
                  <IoLocationSharp className="text-BlueLight text-base" />
                  {office.location}
                </p>
                {office.phone.map((num, i) => (
                  <p
                    key={i}
                    className="text-sm font-thin flex gap-2 text-BlueLight"
                  >
                    <BsFillTelephoneFill className="text-BlueLight text-base" />
                    <span>{num}</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </LogoContainer>
  );
}
