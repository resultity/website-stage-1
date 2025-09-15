// app/[lang]/privacy/page.tsx
"use client";

import React from "react";
import Seo from "@/components/seo";
import UniHeader from "@/components/blocks/Uniheader";
import MarkdownBlock from "@/components/MarkdownBlock";
import { useLang } from "@/components/locale";
import dicts from "./locale";

export default function Page() {
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;

  return (
    <>
      <Seo {...t.seo} />
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container is-max-tablet">
            <UniHeader
              align="center"
              as="h1"
              header={t.header.h1}
              subheader={t.header.sub}
              colorText="white"
              colorLine="primary"
            />
            <div className="box p-5">
              <MarkdownBlock className="content is-medium has-text-black">
                {t.content}
              </MarkdownBlock>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
