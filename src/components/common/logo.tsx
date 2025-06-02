"use client";

import Image from "next/image";
import { logo } from "../../../public";
const logoPath = "/logos/logo.png";

const LoadingLogo = () => <img src={logoPath} alt="Logo" width={200} height={70} id="logo" />;

export default LoadingLogo;
