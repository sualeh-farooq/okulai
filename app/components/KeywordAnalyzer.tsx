'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

export default function KeywordAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const handleAnalyze = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-3"
          whileHover={{ scale: 1.02 }}
        >
          <Sparkles className="w-8 h-8 text-blue-400" />
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent tracking-tight">
            OKUL AI
          </h1>
        </motion.div>
        <p className="text-slate-400 text-lg font-light tracking-wide">
          AI-powered city-based SEO market intelligence for okul
        </p>
      </motion.header>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/50 p-10 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Card Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                Upload Your Keyword CSV
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Upload your school and city-based keywords to analyze search volume, rankings, and market share.
              </p>
            </motion.div>

            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <label
                htmlFor="file-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative block cursor-pointer rounded-2xl p-12 text-center
                  transition-all duration-300 group
                  ${isDragging 
                    ? 'bg-blue-500/10 border-2 border-blue-400 scale-[1.02]' 
                    : file 
                      ? 'bg-emerald-500/5 border-2 border-emerald-500/50'
                      : 'bg-slate-800/30 border-2 border-dashed border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/50'
                  }
                `}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.1
                        }}
                      >
                        <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
                      </motion.div>
                      <p className="text-emerald-400 font-semibold text-lg mb-2">
                        CSV uploaded successfully
                      </p>
                      <p className="text-slate-400 text-sm mb-3">
                        {file.name}
                      </p>
                      <p className="text-slate-500 text-sm">
                        Ready to analyze
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        animate={{ 
                          y: isDragging ? -8 : [0, -5, 0],
                        }}
                        transition={{
                          duration: isDragging ? 0.3 : 2,
                          repeat: isDragging ? 0 : Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {isDragging ? (
                          <Upload className="w-16 h-16 text-blue-400 mb-4" />
                        ) : (
                          <FileText className="w-16 h-16 text-slate-600 mb-4 group-hover:text-blue-400 transition-colors duration-300" />
                        )}
                      </motion.div>
                      <p className="text-white font-medium text-lg mb-2">
                        {isDragging ? 'Drop your CSV here' : 'Drag & drop your CSV here'}
                      </p>
                      <p className="text-slate-500 text-sm">
                        or click to browse
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </label>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button
                onClick={handleAnalyze}
                disabled={!file || isProcessing}
                whileHover={file && !isProcessing ? { scale: 1.02 } : {}}
                whileTap={file && !isProcessing ? { scale: 0.98 } : {}}
                className={`
                  relative w-full py-4 px-8 rounded-xl font-semibold text-lg
                  transition-all duration-300 overflow-hidden
                  ${file && !isProcessing
                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                    : 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  }
                `}
              >
                {/* Animated glow effect */}
                {file && !isProcessing && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1
                    }}
                  />
                )}
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing keywords using AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Run SEO Analysis
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Processing State */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    <div className="flex-1">
                      <p className="text-blue-400 font-medium mb-1">
                        Analyzing your data...
                      </p>
                      <p className="text-slate-500 text-sm">
                        Our AI is processing keywords and generating market insights
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-400"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -z-10"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mt-12 text-slate-600 text-sm text-center"
      >
        Powered by advanced AI algorithms for precise market intelligence
      </motion.p>
    </div>
  );
}
