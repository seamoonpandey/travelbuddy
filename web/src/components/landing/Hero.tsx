"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PLACES } from "@/data/places";
import styles from "./Hero.module.css";
import { SearchIcon } from "../icons";

export default function Hero() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredPlaces = useMemo(() => {
    const query = searchLocation.trim().toLowerCase();
    if (!query) return [] as string[];
    return PLACES.filter((place) => place.toLowerCase().includes(query));
  }, [searchLocation]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchLocation && searchDate) {
      router.push("/dashboard");
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredPlaces.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredPlaces.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredPlaces.length - 1
      );
    } else if (event.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredPlaces.length) {
        setSearchLocation(filteredPlaces[highlightedIndex]);
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    } else if (event.key === "Escape") {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <section id="top" className={styles.hero}>
      <Image
        src="/images/landing/hero.png"
        alt="Nepal Landscape"
        width={2000}
        height={1000}
        className={styles.heroImage}
        priority
      />
      <div className={styles.overlay}>
        <h1 className={styles.title}>
          Find Your Perfect Travel Companion in Nepal
        </h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchRow}>
            <div className={styles.inputWrap}>
              <SearchIcon className={styles.searchIcon} size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Where do you want to go?"
                className={`input input-with-icon`}
                value={searchLocation}
                onChange={(event) => {
                  setSearchLocation(event.target.value);
                  setShowDropdown(true);
                  setHighlightedIndex(-1);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                onKeyDown={handleInputKeyDown}
                required
                autoComplete="off"
              />
              {showDropdown && filteredPlaces.length > 0 && (
                <ul className={styles.dropdown}>
                  {filteredPlaces.map((place, index) => (
                    <li
                      key={place}
                      className={`${styles.dropdownItem} ${
                        highlightedIndex === index
                          ? styles.dropdownItemActive
                          : ""
                      }`}
                      onMouseDown={() => {
                        setSearchLocation(place);
                        setShowDropdown(false);
                        setHighlightedIndex(-1);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              )}
              {showDropdown &&
                searchLocation.trim() !== "" &&
                filteredPlaces.length === 0 && (
                  <div className={styles.dropdown}>
                    <div className={styles.noResults}>No places found.</div>
                  </div>
                )}
            </div>
            <div className={styles.inputWrap}>
              <input
                type="date"
                className="input"
                min={new Date().toISOString().split("T")[0]}
                value={searchDate}
                onChange={(event) => setSearchDate(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
