#!/usr/bin/env python3
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(BASE_DIR, "index.html")
INCLUDES_DIR = os.path.join(BASE_DIR, "_includes")
OUTPUT_PATH = os.path.join(BASE_DIR, "preview.html")

def build():
    if not os.path.exists(INDEX_PATH):
        print(f"Error: {INDEX_PATH} not found.")
        sys.exit(1)

    with open(INDEX_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Strip Jekyll YAML front matter
    content = re.sub(r"^---\n.*?\n---\n?", "", content, flags=re.DOTALL)

    # Replace {% include <filename> %}
    def replace_include(match):
        include_filename = match.group(1).strip()
        include_path = os.path.join(INCLUDES_DIR, include_filename)
        if os.path.exists(include_path):
            with open(include_path, "r", encoding="utf-8") as inc_file:
                return inc_file.read()
        else:
            print(f"Warning: include file '{include_filename}' not found at {include_path}")
            return f"<!-- Missing include: {include_filename} -->"

    compiled_content = re.sub(r"\{%\s*include\s+([^\s%]+)\s*%\}", replace_include, content)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(compiled_content)

    print(f"✅ Generated preview.html ({len(compiled_content)} bytes)")
    print("You can now open 'preview.html' directly in your browser or double-click it!")

if __name__ == "__main__":
    build()
