import React from "react";

const ProfilePage = ({ user, setUser }) => {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: '',
    major: '',
    year: '',
    timezone: 'America/New_York',
    notifications: {
      email: true,
      push: true,
      deadlineReminders: true,
      weeklyDigest: false
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Update user in parent component
    setUser({ ...user, name: profile.name, email: profile.email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleNotificationChange = (key) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  if (!user) {
    return <div className="pt-24 text-center">Please log in to access your profile.</div>;
  }

  return (
    <>
      <Header user={user} />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account and preferences</p>
            </div>
            {saved && (
              <div className="bg-green-50 text-green-800 px-4 py-2 rounded-lg border border-green-200">
                Settings saved successfully!
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'profile'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'notifications'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'preferences'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Preferences
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                      <input
                        type="text"
                        value={profile.university}
                        onChange={(e) => setProfile({...profile, university: e.target.value})}
                        placeholder="Your University"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                      <input
                        type="text"
                        value={profile.major}
                        onChange={(e) => setProfile({...profile, major: e.target.value})}
                        placeholder="Computer Science"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                    <select
                      value={profile.year}
                      onChange={(e) => setProfile({...profile, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Year</option>
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('email')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            profile.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              profile.notifications.email ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-900">Push Notifications</label>
                          <p className="text-sm text-gray-600">Receive browser notifications</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('push')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            profile.notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              profile.notifications.push ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-900">Deadline Reminders</label>
                          <p className="text-sm text-gray-600">Get reminded about upcoming deadlines</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('deadlineReminders')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            profile.notifications.deadlineReminders ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              profile.notifications.deadlineReminders ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-900">Weekly Digest</label>
                          <p className="text-sm text-gray-600">Weekly summary of your tasks and progress</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('weeklyDigest')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            profile.notifications.weeklyDigest ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              profile.notifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">App Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={profile.timezone}
                          onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="America/New_York">Eastern Time (EST/EDT)</option>
                          <option value="America/Chicago">Central Time (CST/CDT)</option>
                          <option value="America/Denver">Mountain Time (MST/MDT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PST/PDT)</option>
                        </select>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Danger Zone</h4>
                        <div className="border border-red-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-3">
                            Delete your account and all associated data. This action cannot be undone.
                          </p>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;