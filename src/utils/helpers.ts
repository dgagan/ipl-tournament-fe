import type { PlayerResponse } from "../api/players.api";

export const getAgeFromDob = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};


export const getApprovedPlayers = (players: PlayerResponse[] | undefined) => {
  return players?.filter((player) => player.status === "APPROVED")?.length;
};