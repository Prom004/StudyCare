// Simple Authorization System for StudyCare
// This is a simplified version that's easy to integrate

// Define user roles (simple hierarchy)
const ROLES = {
    STUDENT: 'student',
    INSTRUCTOR: 'instructor', 
    ADMIN: 'admin'
};

// Simple permission check - just check if user has the required role
const hasRole = (user, requiredRole) => {
    if (!user || !user.role) return false;
    
    // Simple role hierarchy: student < instructor < admin
    const roleLevels = {
        'student': 1,
        'instructor': 2, 
        'admin': 3
    };
    
    const userLevel = roleLevels[user.role] || 0;
    const requiredLevel = roleLevels[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
};

// Check if user owns a resource (simple ownership check)
const isOwner = (user, resource) => {
    if (!user || !resource) return false;
    return resource.userId === user.id;
};

// Simple middleware to require a specific role
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Please log in first" });
        }
        
        if (!hasRole(req.user, requiredRole)) {
            return res.status(403).json({ 
                message: `You need ${requiredRole} access for this action` 
            });
        }
        
        next();
    };
};

// Simple middleware to require ownership OR admin role
const requireOwnership = (resourceType) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Please log in first" });
        }
        
        const resourceId = req.params.id;
        if (!resourceId) {
            return res.status(400).json({ message: "Resource ID required" });
        }
        
        try {
            // Load the resource (you'll need to implement this based on your models)
            const resource = await loadResource(resourceType, resourceId);
            
            if (!resource) {
                return res.status(404).json({ message: "Resource not found" });
            }
            
            // Allow if user owns the resource OR is admin
            if (isOwner(req.user, resource) || hasRole(req.user, 'admin')) {
                req.resource = resource; // Add to request for use in controllers
                next();
            } else {
                return res.status(403).json({ message: "You can only access your own resources" });
            }
        } catch (error) {
            console.error('Resource check error:', error);
            return res.status(500).json({ message: "Error checking resource access" });
        }
    };
};

// Helper function to load resources (you need to implement this)
const loadResource = async (resourceType, resourceId) => {
    // TODO: Implement based on your models
    // Example:
    // if (resourceType === 'course') return await Course.findByPk(resourceId);
    // if (resourceType === 'task') return await Task.findByPk(resourceId);
    // if (resourceType === 'user') return await User.findByPk(resourceId);
    
    console.log(`Loading ${resourceType} with ID ${resourceId}`);
    return null; // Placeholder
};

module.exports = {
    ROLES,
    hasRole,
    isOwner,
    requireRole,
    requireOwnership
};
