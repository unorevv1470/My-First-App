import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { motion } from "framer-motion";
import {
  Code,
  Atom,
  Brain,
  BookOpen,
} from "lucide-react";

const icons = {
  Code: <Code size={22} />,
  Atom: <Atom size={22} />,
  Brain: <Brain size={22} />,
  BookOpen: <BookOpen size={22} />,
};

export default function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("courses")
        .select("*");

      setCourses(data || []);
    }

    load();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        display: "flex",
      }}
    >
      <aside
        style={{
          width: "80px",
          background: "#111",
          borderRight: "1px solid #27272a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          paddingTop: "30px",
        }}
      >
        <BookOpen />
        <Brain />
        <Atom />
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome Back, Unnati 🔥
        </motion.h1>

        <div
          style={{
            marginTop: "25px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{
                background: "#18181b",
                borderRadius: "24px",
                padding: "20px",
                border: "1px solid #27272a",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {icons[course.icon_name] || (
                  <BookOpen size={22} />
                )}

                <span>
                  {course.progress}%
                </span>
              </div>

              <h2 style={{ marginTop: "20px" }}>
                {course.title}
              </h2>

              <div
                style={{
                  marginTop: "20px",
                  height: "8px",
                  background: "#333",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${course.progress}%`,
                  }}
                  transition={{ duration: 1 }}
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(to right,#06b6d4,#6366f1)",
                  }}
                />
              </div>
            </motion.div>
          ))}

          <div
            style={{
              background: "#18181b",
              borderRadius: "24px",
              padding: "20px",
            }}
          >
            <h2>Activity</h2>

            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(7,1fr)",
                gap: "6px",
              }}
            >
              {Array.from({ length: 28 }).map(
                (_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "25px",
                      borderRadius: "6px",
                      background:
                        "rgba(34,211,238,.2)",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}