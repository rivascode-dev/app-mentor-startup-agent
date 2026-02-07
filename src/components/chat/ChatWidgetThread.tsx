import { useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

interface ChatWidgetThreadProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatWidgetThread = ({
  messages,
  isLoading,
}: ChatWidgetThreadProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      component="main"
      sx={{
        flex: "1 1 auto",
        overflowY: "auto",
        p: 2,
        backgroundColor: "grey.100",
      }}
    >
      {messages.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          ¡Empieza la conversación!
        </Typography>
      ) : (
        messages.map(({ id, role, content }) => (
          <Box key={id}>
            <Box sx={{ mb: 2, textAlign: role === "user" ? "right" : "left" }}>
              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: role === "user" ? "primary.main" : "white",
                  color:
                    role === "user" ? "primary.contrastText" : "text.primary",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textAlign: "left",
                  maxWidth: "85%",
                }}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <Typography
                        component="div"
                        variant="body1"
                        sx={{
                          mb: 1.5,
                          "&:last-child": { mb: 0 },
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          lineHeight: 1.6,
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                    strong: ({ children }) => (
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          color: role === "agent" ? "primary.dark" : "inherit",
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                    h1: ({ children }) => (
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 1.5,
                          mt: 2.5,
                          color: role === "agent" ? "primary.dark" : "inherit",
                          fontWeight: 700,
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                    h2: ({ children }) => (
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 1.5,
                          mt: 2,
                          color: role === "agent" ? "primary.dark" : "inherit",
                          fontWeight: 700,
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                    h3: ({ children }) => (
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          mt: 1.5,
                          color: role === "agent" ? "primary.dark" : "inherit",
                          fontWeight: 700,
                        }}
                      >
                        {children}
                      </Typography>
                    ),
                    ul: ({ children }) => (
                      <Box
                        component="ul"
                        sx={{
                          pl: 3,
                          mb: 1.5,
                          "& li": { listStyleType: "disc" },
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    ol: ({ children }) => (
                      <Box
                        component="ol"
                        sx={{
                          pl: 3,
                          mb: 1.5,
                          "& li": { listStyleType: "decimal" },
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    li: ({ children }) => (
                      <Box component="li" sx={{ mb: 1 }}>
                        {typeof children === "string" ? (
                          <Typography variant="body1">{children}</Typography>
                        ) : (
                          children
                        )}
                      </Box>
                    ),
                    code: ({ children }) => (
                      <Box
                        component="code"
                        sx={{
                          bgcolor:
                            role === "user"
                              ? "rgba(255,255,255,0.15)"
                              : "grey.100",
                          color: role === "user" ? "inherit" : "primary.dark",
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 1,
                          fontFamily: "'Fira Code', 'Roboto Mono', monospace",
                          fontSize: "0.9em",
                          border: role === "agent" ? "1px solid" : "none",
                          borderColor: "grey.300",
                        }}
                      >
                        {children}
                      </Box>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </Box>
            </Box>
          </Box>
        ))
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <CircularProgress size={20} />
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};
