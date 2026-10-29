"use client";

import React from "react";
import { Project } from "@/data/projects";
import { Magnetic } from "./MagneticButton";

interface ProjectCardProps {
  project: Project;
  zIndex: number;
}

export function ProjectCard({ project, zIndex }: ProjectCardProps) {
  const renderMockupSvg = (type: Project["svgType"]) => {
    switch (type) {
      case "mcn":
        return (
          <svg className="mockup-svg-graphic" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="220" rx="12" fill="#0E1220" />
            <rect x="25" y="95" width="85" height="32" rx="6" fill="#171B2E" stroke="#7C5CFF" strokeWidth="1.5" />
            <text x="35" y="115" fill="#F2F4FF" fontFamily="monospace" fontSize="9">MCAE Dynamic</text>
            <path d="M110 110 L 160 110 L 195 65 L 245 65" stroke="#22D3EE" strokeWidth="2" />
            <path d="M110 110 L 160 110 L 195 155 L 245 155" stroke="#7C5CFF" strokeWidth="2" />
            <rect x="245" y="50" width="90" height="30" rx="6" fill="#171B2E" stroke="#22D3EE" strokeWidth="1.5" />
            <text x="255" y="69" fill="#22D3EE" fontFamily="monospace" fontSize="8">Audience Flow</text>
            <rect x="245" y="140" width="90" height="30" rx="6" fill="#171B2E" stroke="#7C5CFF" strokeWidth="1.5" />
            <text x="253" y="159" fill="#C8FF3D" fontFamily="monospace" fontSize="8">Custom DLOs</text>
            <circle cx="160" cy="110" r="5" fill="#C8FF3D" />
          </svg>
        );
      case "coca-cola":
        return (
          <svg className="mockup-svg-graphic" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="220" rx="12" fill="#0E1220" />
            <rect x="25" y="25" width="120" height="12" rx="4" fill="#7C5CFF" opacity="0.8" />
            <rect x="25" y="45" width="70" height="8" rx="3" fill="#8B92B5" opacity="0.4" />
            <path d="M30 160 Q 90 90, 150 120 T 270 60 T 330 40" stroke="#22D3EE" strokeWidth="3" fill="none" />
            <circle cx="150" cy="120" r="4" fill="#C8FF3D" />
            <circle cx="270" cy="60" r="4" fill="#22D3EE" />
            <circle cx="330" cy="40" r="4" fill="#7C5CFF" />
            <rect x="30" y="175" width="50" height="15" rx="3" fill="#171B2E" />
            <rect x="90" y="175" width="50" height="15" rx="3" fill="#171B2E" />
            <rect x="150" y="175" width="50" height="15" rx="3" fill="#171B2E" />
          </svg>
        );
      case "automotive":
        return (
          <svg className="mockup-svg-graphic" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="220" rx="12" fill="#0E1220" />
            <circle cx="180" cy="110" r="65" stroke="rgba(124, 92, 255, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="180" cy="110" r="40" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" />
            <circle cx="180" cy="110" r="18" fill="#7C5CFF" opacity="0.7" />
            <path d="M174 110 L 178 114 L 186 106" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="215" cy="80" r="5" fill="#C8FF3D" />
            <circle cx="145" cy="135" r="5" fill="#22D3EE" />
          </svg>
        );
      case "timesheet":
        return (
          <svg className="mockup-svg-graphic" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="220" rx="12" fill="#0E1220" />
            <rect x="40" y="55" width="120" height="110" rx="8" fill="#171B2E" stroke="#7C5CFF" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="22" fill="#0F1220" stroke="#22D3EE" strokeWidth="1.5" />
            <circle cx="100" cy="95" r="8" fill="#C8FF3D" />
            <path d="M85 116 Q 100 108 115 116" stroke="#C8FF3D" strokeWidth="1.5" fill="none" />
            <rect x="180" y="65" width="140" height="15" rx="3" fill="#171B2E" />
            <rect x="180" y="90" width="110" height="15" rx="3" fill="#171B2E" />
            <rect x="180" y="115" width="130" height="15" rx="3" fill="#22D3EE" opacity="0.5" />
            <rect x="180" y="140" width="80" height="20" rx="4" fill="#C8FF3D" opacity="0.9" />
          </svg>
        );
    }
  };

  return (
    <article
      className="project-card js-project-card"
      data-index={project.index}
      style={{ zIndex }}
    >
      <div className="project-card__inner">
        <div className="project-info">
          <div className="project-meta-top">
            <span className="mono-label">{project.badge}</span>
            <span className="project-index">{project.index}</span>
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          <div className="project-psr">
            <div className="psr-row">
              <span className="psr-label prob">Problem</span>
              <span>{project.problem}</span>
            </div>
            <div className="psr-row">
              <span className="psr-label sol">Solution</span>
              <span>{project.solution}</span>
            </div>
            <div className="psr-row">
              <span className="psr-label res">Result</span>
              <span>{project.result}</span>
            </div>
          </div>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-actions">
            <Magnetic>
              <a href={project.inquireUrl} className="btn-lime js-magnetic">
                Inquire Details
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={project.connectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outlined js-magnetic"
              >
                Connect on LinkedIn
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="project-mockup-frame">
          <div className="mockup-topbar">
            <span className="mockup-dot d-red"></span>
            <span className="mockup-dot d-yel"></span>
            <span className="mockup-dot d-grn"></span>
            <span className="mockup-url">{project.mockupUrl}</span>
          </div>
          <div className="mockup-visual">{renderMockupSvg(project.svgType)}</div>
        </div>
      </div>
    </article>
  );
}
