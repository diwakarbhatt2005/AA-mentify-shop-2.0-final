
import React, { useState } from 'react';
import { Edit3, Eye, EyeOff, ArrowRight, CreditCard, TrendingUp, TrendingDown, Activity, User, Camera, Sun, Moon } from 'lucide-react';

const palette = {
  brand: {
    primary: "#02a2bd",
    info: "#06b6d4",
  },
  status: {
    success: "#22c55e",
    warning: "#faad14",
    error: "#f5222d",
  },
  light: {
    bodyBg: "#F3F6FB", // soft cool gray-blue, modern background
    headerBg: "#E6ECF5", // slightly darker, gives structure
    siderBg: "#E6ECF5", // same as header for unity
    cardBg: "#FFFFFF", // crisp card surface
    text: "#0F172A", // slate-900, deep modern text
    textMuted: "#64748B", // slate-500, balanced muted text
    border: "#CBD5E1", // slate-300, subtle divider
    // ✨ Futuristic accents
    accentPrimary: "#2563EB", // electric indigo blue
    accentSecondary: "#06B6D4", // neon aqua cyan
    accentViolet: "#7C3AED", // futuristic violet
    accentGreen: "#10B981", // cyber green for positive stats
    accentError: "#EF4444", // luxury coral red
  },
  dark: {
    bodyBg: "#0B0F19", // deep obsidian with a cool blue undertone
    headerBg: "#111827", // slate-900, slightly lifted
    siderBg: "#111827", // matches header
    cardBg: "#1E293B", // slate-800, metallic panel surface
    text: "#F1F5F9", // slate-100, soft white for readability
    textMuted: "#94A3B8", // slate-400, muted steel gray
    border: "#334155", // slate-700, subtle divider
    accentPrimary: "#2563EB", // electric indigo blue
    accentSecondary: "#06B6D4", // neon aqua cyan
    accentViolet: "#7C3AED", // futuristic violet
    accentGreen: "#10B981", // cyber green for positive stats
    accentError: "#EF4444", // coral red for errors/negatives
  },
};

const AnimatedBackground = ({ isDark }) => {
  const bubbleOpacity = isDark ? 0.015 : 0.04;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Small animated circles */}
      <div 
        className="absolute w-16 h-16 rounded-full animate-pulse"
        style={{ 
          backgroundColor: palette.light.accentPrimary,
          opacity: bubbleOpacity,
          top: '15%',
          left: '10%',
          animationDuration: '4s',
          animationDelay: '0s'
        }}
      />
      <div 
        className="absolute w-12 h-12 rounded-full animate-pulse"
        style={{ 
          backgroundColor: palette.light.accentSecondary,
          opacity: bubbleOpacity,
          top: '25%',
          right: '15%',
          animationDuration: '6s',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute w-20 h-20 rounded-full animate-pulse"
        style={{ 
          backgroundColor: palette.light.accentViolet,
          opacity: bubbleOpacity,
          bottom: '20%',
          left: '20%',
          animationDuration: '5s',
          animationDelay: '1s'
        }}
      />
      <div 
        className="absolute w-14 h-14 rounded-full animate-pulse"
        style={{ 
          backgroundColor: palette.light.accentGreen,
          opacity: bubbleOpacity,
          bottom: '30%',
          right: '10%',
          animationDuration: '7s',
          animationDelay: '3s'
        }}
      />
      <div 
        className="absolute w-6 h-6 rounded-full animate-pulse"
        style={{ 
          backgroundColor: palette.brand.primary,
          opacity: bubbleOpacity,
          top: '50%',
          left: '5%',
          animationDuration: '8s',
          animationDelay: '1.5s'
        }}
      />
      
      {/* Tiny floating dots */}
      <div 
        className="absolute w-6 h-6 rounded-full animate-bounce"
        style={{ 
          backgroundColor: palette.light.accentPrimary,
          opacity: bubbleOpacity,
          top: '40%',
          left: '25%',
          animationDuration: '3s',
          animationDelay: '0s'
        }}
      />
      <div 
        className="absolute w-4 h-4 rounded-full animate-bounce"
        style={{ 
          backgroundColor: palette.light.accentSecondary,
          opacity: bubbleOpacity,
          top: '60%',
          right: '35%',
          animationDuration: '4s',
          animationDelay: '1s'
        }}
      />
      <div 
        className="absolute w-5 h-5 rounded-full animate-bounce"
        style={{ 
          backgroundColor: palette.light.accentViolet,
          opacity: bubbleOpacity,
          bottom: '45%',
          left: '65%',
          animationDuration: '2.5s',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute w-8 h-8 rounded-full animate-bounce"
        style={{ 
          backgroundColor: palette.brand.info,
          opacity: bubbleOpacity,
          top: '70%',
          right: '20%',
          animationDuration: '3.5s',
          animationDelay: '0.5s'
        }}
      />
      <div 
        className="absolute w-7 h-7 rounded-full animate-bounce"
        style={{ 
          backgroundColor: palette.light.accentGreen,
          opacity: bubbleOpacity,
          top: '35%',
          right: '5%',
          animationDuration: '4.5s',
          animationDelay: '2.5s'
        }}
      />
    </div>
  );
};

const UserProfile = () => {
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [userData, setUserData] = useState({
    name: "Lucas Bennett",
    email: "lucasbennett@gmail.com",
    password: "••••••••••",
    userId: "USR_2024_001",
    dob: "1995-06-15",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  });

  const theme = isDark ? palette.dark : palette.light;

  const handleAvatarEdit = () => {
    setIsEditingAvatar(true);
    // Create a file input dynamically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserData(prev => ({
            ...prev,
            avatar: e.target.result
          }));
          setIsEditingAvatar(false);
        };
        reader.readAsDataURL(file);
      } else {
        setIsEditingAvatar(false);
      }
    };
    input.click();
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setEditingField(null);
  };

  const EditableField = ({ label, value, field, type = "text", icon }) => {
    const [tempValue, setTempValue] = useState(value);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const isEditing = editingField === field;

    const handlePasswordSave = () => {
      if (newPassword === reEnterPassword) {
        handleSave(field, newPassword);
        setOldPassword('');
        setNewPassword('');
        setReEnterPassword('');
      } else {
        alert('New passwords do not match!');
      }
    };

    return (
      <div className="relative group">
        <label className="block text-sm font-medium mb-2" style={{ color: theme.textMuted }}>
          {label}
        </label>
        <div className="relative">
          {isEditing ? (
            <div className="flex flex-col gap-3">
              {field === 'password' ? (
                <>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.border,
                      color: theme.text,
                      focusRingColor: palette.brand.primary
                    }}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.border,
                      color: theme.text,
                      focusRingColor: palette.brand.primary
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Re-enter New Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.border,
                      color: theme.text,
                      focusRingColor: palette.brand.primary
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handlePasswordSave}
                      className="px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform"
                      style={{ backgroundColor: palette.brand.primary }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setOldPassword('');
                        setNewPassword('');
                        setReEnterPassword('');
                        setEditingField(null);
                      }}
                      className="px-4 py-2 rounded-lg border hover:scale-105 transition-transform"
                      style={{ 
                        borderColor: theme.border,
                        color: theme.textMuted,
                        backgroundColor: theme.cardBg
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <input
                    type={type}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.border,
                      color: theme.text,
                      focusRingColor: palette.brand.primary
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSave(field, tempValue)}
                    className="px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform"
                    style={{ backgroundColor: palette.brand.primary }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setTempValue(value);
                      setEditingField(null);
                    }}
                    className="px-4 py-2 rounded-lg border hover:scale-105 transition-transform"
                    style={{ 
                      borderColor: theme.border,
                      color: theme.textMuted,
                      backgroundColor: theme.cardBg
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 group-hover:shadow-md cursor-pointer hover:scale-105"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                color: theme.text
              }}
              onClick={() => handleEdit(field)}
            >
              <div className="flex items-center gap-3">
                {icon && <span className="text-lg" style={{ color: theme.text }}>{icon}</span>}
                <span className="font-medium">
                  {field === 'password' && !showPassword ? '••••••••••' : value}
                </span>
              </div>
              <Edit3 
                size={16} 
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                style={{ color: theme.text }}
              />
            </div>
          )}
        </div>
        {field === 'password' && !isEditing && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-12 top-11 p-1 hover:scale-110 transition-transform"
            style={{ color: theme.textMuted }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300 relative" style={{ backgroundColor: theme.bodyBg }}>
      {/* Animated Background */}
      <AnimatedBackground isDark={isDark} />
      
      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b backdrop-blur-sm" style={{ backgroundColor: `${theme.headerBg}95`, borderColor: theme.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: palette.brand.primary }}
            >
              M
            </div>
            <h1 className="text-2xl font-bold" style={{ color: theme.text }}>MentifyAI Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="group px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2"
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.cardBg,
                color: theme.text
              }}
            >
              <User size={18} />
              <span>Buddies</span>
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="group px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md hover:rotate-6"
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.cardBg,
                color: theme.text
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="group flex items-center gap-3 px-6 py-2 rounded-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${palette.brand.primary}, ${palette.light.accentViolet})`
              }}
            >
              <Activity size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Dashboard</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="relative">
          <div className="p-8">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div 
                  className="w-20 h-20 rounded-full border-4 shadow-lg flex items-center justify-center text-2xl font-bold text-white overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ borderColor: palette.brand.primary, backgroundColor: palette.brand.primary }}
                  onClick={handleAvatarEdit}
                >
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<span class="text-white">LB</span>';
                      }}
                    />
                  ) : (
                    <span className="text-white">LB</span>
                  )}
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-3 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all duration-300 hover:rotate-12"
                  style={{ 
                    backgroundColor: theme.cardBg,
                    borderColor: theme.border,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onClick={handleAvatarEdit}
                >
                  {isEditingAvatar ? (
                    <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: theme.text }} />
                  ) : (
                    <Camera size={12} style={{ color: theme.text }} />
                  )}
                </div>
              </div>

              {/* Basic Info - Compact Horizontal Layout */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
                  {userData.name}
                </h2>
                <div className="flex gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                    style={{ 
                      backgroundColor: `${palette.status.success}15`,
                      color: palette.status.success
                    }}
                  >
                    <span className="text-green-500">✓</span>
                    Verified
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${palette.brand.primary}15`,
                      color: palette.brand.primary
                    }}
                  >
                    Premium User
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Section - Moved to top */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.text }}>
              <CreditCard size={20} style={{ color: theme.text }} />
              Digital Wallet
            </h3>
            <button
              className="group flex items-center justify-center gap-2 px-3 py-1 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-sm font-medium"
              style={{ 
                borderColor: palette.brand.primary,
                color: palette.brand.primary,
                backgroundColor: 'transparent'
              }}
            >
              <span>View Details</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Three Cards Side by Side - Compact */}
          <div className="grid grid-cols-3 gap-3">
            {/* Total Balance Card */}
            <div 
              className="rounded-lg p-4 relative overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${palette.brand.primary}, ${palette.light.accentSecondary})`
              }}
            >
              <div className="relative z-10">
                <p className="text-white opacity-80 text-xs mb-1">Total Balance</p>
                <p className="text-lg font-bold text-white mb-2">$12,847.50</p>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-white opacity-80" />
                  <span className="text-white opacity-80 text-xs">+12.5%</span>
                </div>
              </div>
            </div>

            {/* Income Card */}
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: `${palette.status.success}10`,
                borderColor: `${palette.status.success}30`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${palette.status.success}20` }}
                >
                  <TrendingUp size={12} style={{ color: palette.status.success }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: theme.text }}>
                  Income
                </span>
              </div>
              <p className="text-lg font-bold mb-1" style={{ color: palette.status.success }}>
                $8,240.00
              </p>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                +15.3%
              </p>
            </div>

            {/* Expenses Card */}
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: `${palette.status.error}10`,
                borderColor: `${palette.status.error}30`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${palette.status.error}20` }}
                >
                  <TrendingDown size={12} style={{ color: palette.status.error }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: theme.text }}>
                  Expenses
                </span>
              </div>
              <p className="text-lg font-bold mb-1" style={{ color: palette.status.error }}>
                $3,180.25
              </p>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                -8.2%
              </p>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div 
          className="rounded-2xl p-8 shadow-lg backdrop-blur-sm border"
          style={{ 
            backgroundColor: `${theme.cardBg}95`,
            borderColor: `${theme.border}50`
          }}
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.text }}>
            <User size={24} style={{ color: theme.text }} />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              label="Full Name"
              value={userData.name}
              field="name"
              icon={<User size={18} />}
            />
            <EditableField
              label="User ID"
              value={userData.userId}
              field="userId"
              icon={<CreditCard size={18} />}
            />
            <EditableField
              label="Email Address"
              value={userData.email}
              field="email"
              type="email"
              icon={<Activity size={18} />}
            />
            <EditableField
              label="Date of Birth"
              value={userData.dob}
              field="dob"
              type="date"
              icon={<Activity size={18} />}
            />
            <div className="md:col-span-2">
              <EditableField
                label="Password"
                value={userData.password}
                field="password"
                type="password"
                icon={<Eye size={18} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
