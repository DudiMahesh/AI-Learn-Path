"""
Skill gap analyzer.
"""

class SkillGapAnalyzer:
    def analyze(self, user_skills: dict, required_skills: dict) -> list:
        gaps = []
        for skill, req in required_skills.items():
            current = user_skills.get(skill, 0.0)
            target = req.get('target_score', 0.0)
            importance = req.get('importance', 1.0)
            
            gap = max(0.0, target - current)
            if gap > 0:
                gaps.append({
                    'skill': skill,
                    'required': target,
                    'current': current,
                    'gap': gap,
                    'importance': importance
                })
        
        # Sort by gap magnitude by default
        return sorted(gaps, key=lambda x: x['gap'], reverse=True)

    def prioritize_gaps(self, gaps: list) -> list:
        # Sort by gap * importance
        return sorted(gaps, key=lambda x: x['gap'] * x['importance'], reverse=True)

    def get_top_gaps(self, gaps: list, n=3) -> list:
        prioritized = self.prioritize_gaps(gaps)
        return prioritized[:n]
