import { useExhibitorPortalContext } from "@/context/ExhibitorPortalContext";
import { Teams } from "@/types/exhibitor";
import { FormikValues, useFormikContext } from "formik";
import { Dispatch, SetStateAction } from "react";

type Props = {
  // setOpenModal: Dispatch<SetStateAction<boolean>>;
  initialValues: FormikValues;
};

const useTeamEditor = ({ initialValues }: Props) => {
  const { currentUser, setCurrentUser } = useExhibitorPortalContext();
  const { dirty, isValid, values, handleReset, submitForm, setValues } =
    useFormikContext<FormikValues>(); // Use Teams here
  let { teams } = currentUser;

  const handleDiscard = () => {
    setValues(initialValues);
  };

  const handleSave = (currentTeam: FormikValues) => {
    const teamIndex = teams.findIndex((team) => team.id === currentTeam.id);

    if (teamIndex !== -1) {
      const updatedTeams = [...teams];

      updatedTeams[teamIndex] = { ...updatedTeams[teamIndex], ...currentTeam }; // Merge the changes

      setCurrentUser({ ...currentUser, teams: updatedTeams });

      submitForm();
    }
  };

  return {
    handleDiscard,
    handleSave,
    isValid,
    dirty,
    values,
  };
};

export default useTeamEditor;
