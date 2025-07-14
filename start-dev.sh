#!/bin/bash

echo "🚀 Starting Museum Kiosk App Development"
echo "========================================"
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Starting Next.js development server..."
echo "   This will run on http://localhost:3000"
echo ""

# Start Next.js in background
npm run next-dev &
NEXTJS_PID=$!

echo "⏳ Waiting for Next.js to be ready..."
npx wait-on http://localhost:3000 --timeout 30000

if [ $? -eq 0 ]; then
    echo "✅ Next.js is ready!"
    echo ""
    echo "🖥️  Starting Electron app..."
    echo "   Development shortcuts:"
    echo "   - Ctrl+Q: Quit app"
    echo "   - Ctrl+R: Reload app" 
    echo "   - F12: Open DevTools"
    echo "   - Escape: Exit fullscreen"
    echo ""
    
    # Start Electron
    electron .
    
    echo ""
    echo "🛑 Stopping Next.js server..."
    kill $NEXTJS_PID
    echo "✅ Development session ended."
else
    echo "❌ Next.js failed to start within 30 seconds"
    echo "🛑 Stopping processes..."
    kill $NEXTJS_PID
    exit 1
fi
