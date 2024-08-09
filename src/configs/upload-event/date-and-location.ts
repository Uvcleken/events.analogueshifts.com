// Checks If All the required info field Has been Field
export const validate = (
  startsDate: string,
  endsDate: string,
  location: string,
  locationType: string
) => {
  const validateLocation = () => {
    if (
      (locationType === "physical" && location !== "null") ||
      locationType === "virtual"
    ) {
      return true;
    } else {
      return false;
    }
  };

  if (
    startsDate.trim().length &&
    endsDate.trim().length &&
    validateLocation()
  ) {
    return true;
  } else {
    return false;
  }
};

export interface DateAndLocationInterface {
  isOpen: boolean;
  toggleSection: any;
  dateAndLocationInfo: any;
  setDateAndLocationInfo: (data: any) => void;
}
