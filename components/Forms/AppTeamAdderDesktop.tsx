import React, { FC } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import CloseIcon from "@mui/icons-material/Close";
import { Field } from "@/types/register";
import { FormikValues, useFormikContext } from "formik";
import { AppButton, AppFormField, AppImageUploader } from "..";
import { useTeamAdder } from "@/hooks";

type Props = {
  setEditing: (editing: boolean) => void;
  fields: Field[];
  initialValues: FormikValues;
};

const AppTeamAdderDesktop: FC<Props> = ({ setEditing, fields }) => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const { handleDiscard, handleSave, dirty, isValid } = useTeamAdder();
  const handleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("image", imageUrl);
  };

  return (
    <div>
      <Sheet
        sx={{
          display: { xs: "none", md: "initial" },
          borderLeft: "1px solid",
          borderColor: "neutral.outlinedBorder",
        }}
      >
        <Box sx={{ pb: 2, display: "flex", alignItems: "center" }}>
          <Typography sx={{ flex: 1 }}>Add new member</Typography>
          <IconButton
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => setEditing(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <AppImageUploader onFileUpload={(file) => handleFileUpload(file)} />

        <Divider />
        <div className="flex flex-col gap-2 mt-5">
          {fields.map((item) => (
            <AppFormField
              key={item.name}
              required={item.required}
              name={item.name}
              label={item.label}
              className="min-w-[300px] xs:min-w-[200px] lg:min-w-[300px]"
            />
          ))}
        </div>
        <div className="flex gap-5 mx-auto">
          <AppButton
            label="Save"
            handleAction={() => handleSave()}
            disabled={!isValid || !dirty}
          />

          <AppButton label="Discard" handleAction={handleDiscard} />
        </div>
      </Sheet>
    </div>
  );
};

export default AppTeamAdderDesktop;
