"use client"
import React, { useEffect, useState } from 'react'
import { fetchWelcomeMessage } from "@/app/api/siteSettings";
import DOMPurify from "dompurify";
import { safeSanitize } from '@/lib/utils';


const WelcomeSection = () => {
  const [setting, setSetting] = useState({});

  useEffect(() => {
  async function load() {
    try {
      const settingsData = await fetchWelcomeMessage()

      setSetting(settingsData);
    } catch (err) {
      console.error(err);
    }
  }
  load();
}, []);

    if (!setting) {
        return (<></>);
    }

    return (
        <section className="WelcomeSection">
            <div className="container" dangerouslySetInnerHTML={{
                          __html: safeSanitize(setting),
                        }} />
        </section>
    );
};



export default WelcomeSection