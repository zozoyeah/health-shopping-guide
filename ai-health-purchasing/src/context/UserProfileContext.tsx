"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile, PersonaResult, RiceOrder, ReplenishmentUnit } from "@/types";
import { derivePersona } from "@/lib/derivePersona";
import {
  saveUserProfile,
  getUserProfile,
  savePersonaResult,
  getPersonaResult,
  clearAllData,
  saveRiceOrder,
  getRiceOrder,
  saveReplenishmentUnit,
  getReplenishmentUnit,
  clearReplenishmentData,
} from "@/lib/storage";

interface UserProfileContextType {
  profile: UserProfile | null;
  personaResult: PersonaResult | null;
  isCompleted: boolean;
  riceOrder: RiceOrder | null;
  replenishmentUnit: ReplenishmentUnit | null;
  setProfile: (profile: UserProfile) => void;
  completeOnboarding: (profileToUse?: UserProfile) => void;
  resetProfile: () => void;
  setRiceOrder: (order: RiceOrder) => void;
  setReplenishmentUnit: (unit: ReplenishmentUnit) => void;
  updateReplenishmentAction: (action: "confirm" | "postpone" | "skip") => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [personaResult, setPersonaResult] = useState<PersonaResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [riceOrder, setRiceOrderState] = useState<RiceOrder | null>(null);
  const [replenishmentUnit, setReplenishmentUnitState] = useState<ReplenishmentUnit | null>(null);

  // 初始化时从localStorage加载
  useEffect(() => {
    const storedProfile = getUserProfile();
    const storedPersona = getPersonaResult();
    const storedRiceOrder = getRiceOrder();
    const storedReplenishment = getReplenishmentUnit();

    if (storedProfile) {
      setProfileState(storedProfile);
    }
    if (storedPersona) {
      setPersonaResult(storedPersona);
      setIsCompleted(true);
    }
    if (storedRiceOrder) {
      setRiceOrderState(storedRiceOrder);
    }
    if (storedReplenishment) {
      setReplenishmentUnitState(storedReplenishment);
    }
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    saveUserProfile(newProfile);
  };

  const completeOnboarding = (profileToUse?: UserProfile) => {
    const profileToDerive = profileToUse || profile;
    if (profileToDerive) {
      const result = derivePersona(profileToDerive);
      setPersonaResult(result);
      savePersonaResult(result);
      setIsCompleted(true);
    }
  };

  const setRiceOrder = (order: RiceOrder) => {
    setRiceOrderState(order);
    saveRiceOrder(order);
  };

  const setReplenishmentUnit = (unit: ReplenishmentUnit) => {
    setReplenishmentUnitState(unit);
    saveReplenishmentUnit(unit);
  };

  const updateReplenishmentAction = (action: "confirm" | "postpone" | "skip") => {
    if (replenishmentUnit) {
      const updated = {
        ...replenishmentUnit,
        action,
        actionDate: new Date().toISOString(),
      };
      setReplenishmentUnitState(updated);
      saveReplenishmentUnit(updated);
    }
  };

  const resetProfile = () => {
    setProfileState(null);
    setPersonaResult(null);
    setIsCompleted(false);
    setRiceOrderState(null);
    setReplenishmentUnitState(null);
    clearAllData();
    clearReplenishmentData();
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        personaResult,
        isCompleted,
        riceOrder,
        replenishmentUnit,
        setProfile,
        completeOnboarding,
        resetProfile,
        setRiceOrder,
        setReplenishmentUnit,
        updateReplenishmentAction,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
