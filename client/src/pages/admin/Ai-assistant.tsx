import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Plus,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Package,
  ChartNoAxesCombined,
  ArrowUpRight,
  User,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
}

const suggestions = [
  {
    icon: TrendingUp,
    title: "Sales Analysis",
    description: "Analyze my store sales performance.",
    prompt: "Give me a sales performance analysis.",
  },
  {
    icon: Package,
    title: "Inventory Insights",
    description: "Find products with low stock.",
    prompt: "Which products are running low on stock?",
  },
  {
    icon: ShoppingBag,
    title: "Order Summary",
    description: "Summarize my recent orders.",
    prompt: "Give me a summary of my recent orders.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Growth Suggestions",
    description: "Get ideas to improve store sales.",
    prompt: "How can I improve my fashion store sales?",
  },
];

function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatStarted, setIsChatStarted] = useState(false);

  // UI demonstration only.
  // Replace this function with your backend AI API later.
  const sendMessage = (message?: string) => {
    const content = (message ?? input).trim();

    if (!content) return;

    setIsChatStarted(true);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content,
      },
    ]);

    setInput("");
  };

  const startNewChat = () => {
    setMessages([]);
    setInput("");
    setIsChatStarted(false);
  };

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            AI Assistant
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Your intelligent assistant for managing your fashion store.
          </p>
        </div>

        <Button
          onClick={startNewChat}
          variant="outline"
          className="h-10 border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <Plus size={16} className="mr-2" />
          New Conversation
        </Button>
      </div>

      {/* AI Status */}
      <Card className="overflow-hidden border-zinc-800 bg-linear-to-br  bg-zinc-900/40">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Sparkles size={27} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">
                  Fashion AI Assistant
                </h2>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                  Ready to help
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                Ask questions about your products, orders, sales, and store.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="size-2 rounded-full bg-emerald-400" />
            AI Assistant
          </div>
        </div>
      </Card>

      {/* Chat Area */}
      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <Card className="flex min-h-150 flex-col overflow-hidden border-zinc-800 bg-zinc-900/40">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Bot size={19} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  New Conversation
                </h3>
                <p className="text-xs text-zinc-500">
                  Ask me anything about your store
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-500 hover:text-white"
            >
              <MoreHorizontal size={19} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
            {!isChatStarted ? (
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                  <Sparkles size={30} />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-white">
                  How can I help you today?
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                  I can help you understand your store performance, manage
                  inventory, analyze orders, and discover opportunities for
                  growth.
                </p>

                <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                  {suggestions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.title}
                        onClick={() => sendMessage(item.prompt)}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 text-left transition-all hover:border-amber-500/30 hover:bg-zinc-800/40"
                      >
                        <div className="flex items-center gap-2 text-amber-400">
                          <Icon size={17} />
                          <span className="text-sm font-medium text-white">
                            {item.title}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-zinc-500">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                        <Bot size={18} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "bg-amber-500 text-zinc-950"
                          : "border border-zinc-800 bg-zinc-950 text-zinc-300"
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.role === "user" && (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300">
                        <User size={17} />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-zinc-800 p-4 sm:p-5">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-2 focus-within:border-amber-500/40">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask anything about your store..."
                className="min-h-12 resize-none border-0 bg-transparent text-sm text-white shadow-none focus-visible:ring-0"
              />

              <div className="flex items-center justify-between px-2 pb-1">
                <p className="text-[11px] text-zinc-600">
                  AI responses require an AI backend connection.
                </p>

                <Button
                  size="icon"
                  disabled={!input.trim()}
                  onClick={() => sendMessage()}
                  className="size-9 bg-amber-500 text-zinc-950 hover:bg-amber-400 disabled:opacity-30"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] text-zinc-600">
              AI can make mistakes. Verify important store information.
            </p>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="border-zinc-800 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2">
              <MessageSquare size={17} className="text-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                Quick Actions
              </h3>
            </div>

            <div className="mt-4 space-y-2">
              {suggestions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    onClick={() => sendMessage(item.prompt)}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-zinc-800/60"
                  >
                    <Icon size={17} className="text-zinc-500" />
                    <span className="flex-1 text-sm text-zinc-300">
                      {item.title}
                    </span>
                    <ArrowUpRight size={14} className="text-zinc-600" />
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/40 p-5">
            <h3 className="text-sm font-semibold text-white">
              Conversation Tips
            </h3>

            <div className="mt-4 space-y-4">
              {[
                "Ask specific questions for better answers.",
                "Use sales and inventory data for analysis.",
                "Ask for actionable recommendations.",
              ].map((tip, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs text-amber-400">
                    {index + 1}
                  </span>
                  <p className="text-xs leading-5 text-zinc-500">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantPage;
