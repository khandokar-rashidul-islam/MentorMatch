import AppError from "../../errors/AppError";
import { Gig } from "./mentor.interface";
import { GigModel } from "./mentor.model";
import httpStatus from "http-status";

//* Create Gig
export const createGig = async (userId: string, payload: Gig) => {
  const gig = await GigModel.create({ ...payload, user: userId });
  return gig;
};

//* Update Gig
export const updateGig = async (
  gigId: string,
  userId: string,
  payload: Partial<Gig>
) => {
  const gig = await GigModel.findOneAndUpdate(
    { _id: gigId, user: userId },
    payload,
    { new: true }
  );
  if (!gig)
    throw new AppError(httpStatus.NOT_FOUND, "Gig not found or unauthorized");
  return gig;
};

//* Delete Gig
export const deleteGig = async (gigId: string, userId: string) => {
  const gig = await GigModel.findOneAndDelete({ _id: gigId, user: userId });
  if (!gig)
    throw new AppError(httpStatus.NOT_FOUND, "Gig not found or unauthorized");
  return gig;
};

//* Get Single Gig
export const getGigById = async (gigId: string) => {
  const gig = await GigModel.findById(gigId).populate("user", "name email");
  if (!gig) throw new AppError(httpStatus.NOT_FOUND, "Gig not found");
  return gig;
};

//* Get All Gigs (public)
export const getAllGigs = async (filter: Record<string, unknown> = {}) => {
  const gigs = await GigModel.find(filter).populate("user", "name email");
  return gigs;
};

//* Get Gigs by Owner
export const getMyGigs = async (userId: string) => {
  const gigs = await GigModel.find({ user: userId });
  return gigs;
};
