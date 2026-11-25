/**
 * courseImages.js
 * Curated high-resolution photography tailored for Tech Career Tracks
 * (Data Science, Web Development, Machine Learning, Cloud & DevOps, Cybersecurity).
 */
export const getCourseImage = (title = '', category = '', index = 0) => {
  const t = (title + ' ' + category).toLowerCase();

  // Biology
  if (t.includes('biology') || t.includes('bio')) {
    return 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80'; // Biology cell microscope
  }

  // Physics
  if (t.includes('biology') || t.includes('bio')) {
    return 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('physics')) {
    return 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80'; // Atomic orbital / physics physics model
  }

  // Chemistry
  if (t.includes('chemistry') || t.includes('chem')) {
    return 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop&q=80'; // Laboratory beakers chemistry
  }

  // Data Science & Python
  if (t.includes('data science') || t.includes('python') || t.includes('analytics') || t.includes('pandas')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'; // Data analytics graphs
  }

  // Machine Learning & AI
  if (t.includes('machine learning') || t.includes('predictive') || t.includes('ai') || t.includes('deep learning')) {
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80'; // AI digital neural network
  }

  // Web Development & Full-Stack
  if (t.includes('web') || t.includes('react') || t.includes('node') || t.includes('full-stack') || t.includes('javascript')) {
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'; // Modern coding editor on screen
  }

  // Cloud & DevOps / Docker
  if (t.includes('cloud') || t.includes('docker') || t.includes('devops') || t.includes('kubernetes') || t.includes('aws')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'; // Cloud network glowing earth
  }

  // Cybersecurity
  if (t.includes('cyber') || t.includes('security') || t.includes('threat') || t.includes('cryptography')) {
    return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80'; // Digital security lock
  }

  const fallbacks = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80', // Laptop with code
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80', // Matrix binary code
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80', // Programming setup
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'  // High-tech microchip
  ];
  return fallbacks[index % fallbacks.length];
};

export const getAssessmentImage = (title = '', type = '', index = 0) => {
  const t = (title + ' ' + type).toLowerCase();

  if (t.includes('biology') || t.includes('bio')) {
    return 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('physics')) {
    return 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('chemistry') || t.includes('chem')) {
    return 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop&q=80';
  }

  if (t.includes('data science') || t.includes('python')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('machine learning') || t.includes('ai')) {
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('web') || t.includes('full-stack') || t.includes('react')) {
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('cloud') || t.includes('docker') || t.includes('devops')) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('cyber') || t.includes('security')) {
    return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('diagnostic')) {
    return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
  }

  const fallbacks = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80'
  ];
  return fallbacks[index % fallbacks.length];
};
