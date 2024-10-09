import { convertDateFormat } from "./convert-date-format";

export const handleUpload = (
  method: string,
  setLoading: any,
  thumbnail: string,
  eventInfoData: any,
  dateAndLocationInfo: any,
  uploadEvent: any,
  uuid?: string
) => {
  uploadEvent({
    setLoading,
    data: {
      thumbnail,
      email: eventInfoData.email,
      contact: eventInfoData.contact,
      title: eventInfoData.title,
      description: eventInfoData.description,
      price: eventInfoData.price,
      maximum: eventInfoData.maximum,
      status: eventInfoData.status,
      starts_date: convertDateFormat(dateAndLocationInfo.startsDate),
      ends_date: convertDateFormat(dateAndLocationInfo.endsDate),
      location_type: dateAndLocationInfo.locationType,
      location: dateAndLocationInfo.location,
      url_link: dateAndLocationInfo.url_link,
      longitude: dateAndLocationInfo.longitude,
      latitude: dateAndLocationInfo.latitude,
      category:
        eventInfoData.category.length > 0
          ? eventInfoData.category.join(", ")
          : null,
    },
    method: method,
    uuid,
  });
};
