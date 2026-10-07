"use client";

import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { FaqItem } from "@/components/landing/faq/faq-item";

interface FaqListProps {
  items: readonly { question: string; answer: string }[];
}

export const FaqList = ({ items }: FaqListProps) => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) =>
    setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <VStack align="stretch" gap="0">
      {items.map((item, index) => (
        <FaqItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          index={index}
          isOpen={openIndex === index}
          isLast={index === items.length - 1}
          onToggle={handleToggle}
        />
      ))}
    </VStack>
  );
};

export default FaqList;
