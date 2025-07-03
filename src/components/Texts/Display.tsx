import { Heading, HeadingProps } from "@chakra-ui/react";

interface DisplayProps extends HeadingProps {
  text?: string;
}

export const DisplaySmall = ({ text, children, ...props }: DisplayProps) => (
  <Heading
    as="h1"
    color="content.alternative"
    fontSize="display.sm"
    lineHeight="44px"
    fontWeight="600"
    fontStyle="normal"
    {...props}
  >
    {text}
    {children}
  </Heading>
);

export const DisplayMedium = ({ children, ...props }: HeadingProps) => (
  <Heading
    as="h1"
    color="content.alternative"
    fontSize="45"
    lineHeight="52"
    fontWeight="600"
    fontStyle="normal"
    {...props}
  >
    {children}
  </Heading>
);

export const DisplayLarge = ({ children, ...props }: HeadingProps) => (
  <Heading
    as="h1"
    color="content.alternative"
    fontSize="57"
    lineHeight="64"
    fontWeight="600"
    fontStyle="normal"
    {...props}
  >
    {children}
  </Heading>
);